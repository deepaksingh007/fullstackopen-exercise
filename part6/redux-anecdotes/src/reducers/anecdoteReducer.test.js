import {reducer, vote} from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

const initialState = [
    {
        content: 'test 1',
        id: 1,
        votes: 0
    },
    {
        content: 'test 2',
        id: 2,
        votes: 0
    },
    {
        content: 'test 3',
        id: 3,
        votes: 0
    }
]

describe('anecdoteReducer', ()=>{
    test('vote', () => {
        const state = [...initialState]
        deepFreeze(state)
        const action = vote(1)
        const actual = reducer(state, action)
        expect(actual).toEqual(
            [
                {
                    content: 'test 1',
                    id: 1,
                    votes: 1
                },
                {
                    content: 'test 2',
                    id: 2,
                    votes: 0
                },
                {
                    content: 'test 3',
                    id: 3,
                    votes: 0
                }
            ]
        )
    });
});