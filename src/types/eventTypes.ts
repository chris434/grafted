export type ExtendedMouseEvent<T> = MouseEvent & {
    currentTarget: EventTarget & T
}