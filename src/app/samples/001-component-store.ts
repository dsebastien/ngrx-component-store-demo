import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from "@angular/core";
import { WhateverState } from "./001-component-store-shape.intf";

const DEFAULT_STATE: WhateverState = {
    foo: "default foo",
    bar: "default bar",
    isWorkingFromHome: false,
    someData: [],
    users: {},
};

@Injectable()
export class WhateverComponentStore extends ComponentStore<WhateverState> {
    constructor() {
        // initial state
        super(DEFAULT_STATE);
    }
}
