import { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';
import equal from 'deep-equal';

function filterKeys(raw, allowed) {
    if (!raw) {
        return raw;
    }
    const s = new Set(allowed);
    return Object.keys(raw)
        .filter((key) => s.has(key))
        .reduce((obj, key) => {
            const newObj = obj;
            newObj[key] = raw[key];
            return newObj;
        }, {});
}

export default function useRtDbData(specs = []) {
    const isInitialMount = useRef(true);
    const unmounting = useRef(false);
    const offs = useRef({});
    const [state, setState] = useState({});

    const subscribeToSpec = (spec) => {
        const { name, keys, path } = spec;
        if (!path) {
            return;
        }
        const ref = firebase.database().ref(path);
        const offFunc = ref.on('value', (snap) => {
            const dat = keys ? filterKeys(snap.val(), keys) : snap.val();
            if (equal(dat, state[name])) {
                return;
            }
            setState({
                [name]: dat,
            });
        });
        let hasBeenOffed = false;
        const off = () => {
            if (hasBeenOffed) {
                return;
            }
            hasBeenOffed = true;
            if (!unmounting.current) {
                setState({
                    [name]: null,
                });
            }
            ref.off('value', offFunc);
        };

        if (!offs.current[path]) {
            offs.current[path] = null;
        }
        offs.current[path] = off;
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            specs.forEach((spec) => {
                subscribeToSpec(spec);
            });
        } else {
            const resubs = new Set();
            specs.forEach((spec) => {
                const { path } = spec;
                if (typeof offs.current[path] === 'function') {
                    offs.current[path]();
                }
                offs.current[path] = null;

                if (resubs.has(spec.name)) return;
                resubs.add(spec.name);
                subscribeToSpec(spec);
            });
        }

        return () => {
            unmounting.current = true;
            Object.values(offs.current).forEach((offFunc) => {
                offFunc();
            });
            offs.current = {};
        };
    }, [specs]);

    const isLoading = specs.some((spec) => !state[spec.name]);

    return { ...state, isLoading };
}
