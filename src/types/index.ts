import type {User} from "firebase/auth";

export type Data = {
    // SDKなど外部ライブラリの型は定義されてない場合もあります。厳密さを求めないのであればanyで問題ありません。
    // 今回は見つけてしまったのでimportしてみました
    user: User | null,
    chat: Chat[],
    input: string,
    displayName: string
};

export type Chat = {
    message: string,
    uid: string,
    displayName: string
};

export type SignUp = {
    email: string,
    password: string,
    passwordReInput: string,
};

export type Login = {
    email: string,
    password: string,
};
