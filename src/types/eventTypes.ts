export type ExtendedMouseEvent<T> = MouseEvent & {
    currentTarget: EventTarget & T
}
export type ExtendedEvent= Event & {
    readonly submitter: HTMLElement | null;
} & {
    currentTarget: EventTarget & HTMLFormElement;
}