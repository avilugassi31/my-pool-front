const INITIAL_STATE = {
    members: [],
    member: null,
};

export function poolReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_MEMBERS':
            return {
                ...state,
                members: action.members,
            };
        case 'SET_MEMBER':
            return {
                ...state,
                member: action.member,
            };
        case 'ADD_MEMBER':
            return {
                ...state,
                members: [...state.members, action.member],
            };
        case 'REMOVE_MEMBER':
            return {
                ...state,
                members: state.members.filter((member) => member._id !== action.memberId),
            };
        case 'UPDATE_MEMBER':
            const { updatedMember } = action;
            return {
                ...state,
                members: state.members.map((member) =>
                    member._id === updatedMember._id ? updatedMember : member
                ),
            };
        default:
            return state;
    }
}
