export interface Rule {
	rule: RegExp;
	msg: string;
}

export const emailRule = RegExp(/^.+@.+\.[a-zA-Z]{2,3}$/);
export const phoneRule = RegExp(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
export const sixSymbolsRule = RegExp(/^.{6,}$/);
export const notEmptyRule = RegExp(/^.{1,}$/);
