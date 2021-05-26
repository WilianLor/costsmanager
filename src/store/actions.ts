import { Categories, Costs } from './dataReducer'
export type Action = {type: "CREATE_CATEGORY" | "REMOVE_CATEGORY" | "CREATE_COST" | "REMOVE_COST" | "TOGGLE_PAYMENT_STATUS", payload: Payload }

interface Payload {
    id: string,
    title: string,
    value: Number,
    categoryId: string,
    paymentStutus: boolean,
    dueDate?: Date
}

export const CreateCategory = (payload: Categories): Action => {
    return {
        type: 'CREATE_CATEGORY',
        payload: {
            id: payload.id,
            title: payload.title,
            value: 0,
            categoryId: '',
            paymentStutus: false,
            dueDate: undefined
        }
    }
}

export const RemoveCategorie = (payload: {id: string}): Action => {
    return {
        type: 'REMOVE_CATEGORY',
        payload: {
            id: payload.id,
            title: '',
            value: 0,
            categoryId: '',
            paymentStutus: false,
            dueDate: undefined
        }
    }
}

export const CreateCost = (payload: Costs): Action => {
    return {
        type: 'CREATE_COST',
        payload: {
            id: payload.id,
            title: payload.title,
            value: payload.value,
            categoryId: payload.categoryId,
            paymentStutus: payload.paymentStatus,
            dueDate: payload.dueDate
        }
    }
}

export const RemoveCost = (payload: {id: string}): Action => {
    return {
        type: 'REMOVE_COST',
        payload: {
            id: payload.id,
            title: '',
            value: 0,
            categoryId: '',
            paymentStutus: false,
            dueDate: undefined
        }
    }
}

export const TogglePaymentStatus = (payload: {id: string}): Action => {
    return {
        type: 'TOGGLE_PAYMENT_STATUS',
        payload: {
            id: payload.id,
            title: '',
            value: 0,
            categoryId: '',
            paymentStutus: false,
            dueDate: undefined
        }
    }
}

