
interface  Document {
    selection: {
        createRange: () => {
            moveStart: (a: string, b: number) => void;
            text: string;
        };
        };
}


declare module React {
    interface KeyboardEvent<T=Element> extends React.KeyboardEvent<T> {
        target: {
            selectionStart: number;
            selectionEnd: number 
            value: string;
        };
    }
}


    


