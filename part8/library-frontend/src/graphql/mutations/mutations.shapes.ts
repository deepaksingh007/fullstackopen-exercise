import {ExecutionResult, MutationFunctionOptions} from "@apollo/react-common";
export type SetBornVariables = {
    /** name of author*/
    name: string,
    /** born year of author*/
    born: number
}
export type CreateBookVariables = {title: string, author: string, published: number, genres: string[]}
export type LoginVariables = {username: string, password: string}
export type MutationFuction<Result, Variables> = (options: MutationFunctionOptions<Result, Variables>) => Promise<ExecutionResult<Result>>


