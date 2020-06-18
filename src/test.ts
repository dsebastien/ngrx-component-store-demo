import {WhateverComponentStore} from "./app/samples/001-component-store";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

describe('tests', () => {
    it('should be easy to instantiate', () => {
        const store: WhateverComponentStore = new WhateverComponentStore();

        const sub = store.state$.subscribe((currentState) => {
            console.log("Current state: ", currentState);
        })

        sub.unsubscribe();

        expect(true).toBe(true);
    });

    it('should be easy to subscribe to the state (full or parts) and to set/update it', () => {
        const store: WhateverComponentStore = new WhateverComponentStore();

        const sub1 = store.state$.subscribe((currentState) => {
            console.log("Current state: ", currentState);
        })

        const fooSelector = store.select((currentState) => {
            return currentState.foo;
        });
        const sub2 = fooSelector.subscribe((currentFoo => {
            console.log("Current foo: ", currentFoo);
        }));

        store.setState({
            users: {},
            someData: [],
            isWorkingFromHome: true,
            foo: "Yes foo!",
            bar: "Yes bar!",
        });

        store.setState((currentState) => {
            return {
                ...currentState,
                foo: "Another foo",
                bar: "Another bar",
            };
        });

        const myUpdater = store.updater((currentState, newValue: string) => {
            return {
                ...currentState,
                foo: newValue,
            };
        });

        myUpdater("Updated foo");

        const myEffect = store.effect((origin$: Observable<string>) =>
            origin$.pipe(tap((v) => console.log("Value: ", v))));

        myEffect('value 1');
        myEffect('value 2');


        sub1.unsubscribe();
        sub2.unsubscribe();
        expect(true).toBe(true);
    });
});
