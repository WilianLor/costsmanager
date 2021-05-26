import { Action } from './actions'

export interface State {
    categories?: [Categories]
    costs?: [Costs]
}

export interface Categories {
    id: string,
    title: string,
}

export interface Costs {
    id: string,
    categoryId: string,
    title: string,
    value: Number,
    dueDate?: Date,
    paymentStatus: boolean
}

export const dataReducer = (state: State, action: Action) => {
    switch(action.type) {
        case "CREATE_CATEGORY": {

            let categories
            if(state.categories != undefined){
                categories = state.categories
                categories.push({
                    id: action.payload.id,
                    title: action.payload.title
                })
            } else {
                categories = [{
                    id: action.payload.id,
                    title: action.payload.title
                }]
            }

            return {
                ...state,
                categories: categories
            }
        }
        case "REMOVE_CATEGORY": {

            const categoryId = action.payload.id 

            let categories = state.categories ? state.categories : []
            const categoryIndex = categories.findIndex((category) => category.id == categoryId)
            categories.splice(categoryIndex, 1)

            let costs = state.costs ? state.costs : []
            const costsToRemove = costs.filter((cost) => cost.categoryId == categoryId)

            costsToRemove.forEach((costRemove) => {
                const costIndex = costs.findIndex((cost) => cost.id == costRemove.id)
                costs.splice(costIndex, 1)
            })

            return {
                ...state,
                categories: categories,
                costs: costs
            }
        }
        case "CREATE_COST": {

            let costs
            if(state.costs != undefined){
                costs = state.costs
                costs.push({
                    id: action.payload.id,
                    categoryId: action.payload.categoryId,
                    title: action.payload.title,
                    value: action.payload.value,
                    dueDate: action.payload.dueDate,
                    paymentStatus: action.payload.paymentStutus
                })
            } else {
                costs = [{
                    id: action.payload.id,
                    categoryId: action.payload.categoryId,
                    title: action.payload.title,
                    value: action.payload.value,
                    dueDate: action.payload.dueDate,
                    paymentStatus: action.payload.paymentStutus
                }]
            }

            return {
                ...state,
                costs: costs
            }
        }
        case "REMOVE_COST": {

            const costId = action.payload.id 

            let costs = state.costs ? state.costs : []
            const costIndex = costs.findIndex((cost) => cost.id == costId)
            costs.splice(costIndex, 1)

            return {
                ...state,
                costs: costs
            }
        }
        case "TOGGLE_PAYMENT_STATUS": {

            const costId = action.payload.id 

            let costs = state.costs ? state.costs : []

            costs.forEach((cost) => {
                if(cost.id == costId) {
                    cost.paymentStatus = cost.paymentStatus ? false : true
                }
            })

            return {
                ...state,
                costs: costs
            }
        }
    }
}