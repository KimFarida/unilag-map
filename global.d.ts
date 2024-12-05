// global.d.ts
export {};

declare global {
    interface Window {
        setStart?: (id: number) => void;
        setEnd?: (id: number) => void;
    }
}
