import { poolService } from '../../services/pool.service';
// import { utilService } from '../../services/util.service';

  export function loadMembers() {
    return async (dispatch) => {
        const members = await poolService.getMembers();
        const action = {
            type: 'SET_MEMBERS',
            members,
        };
        dispatch(action);
    };
}
export function getMemberById(memberId) {
    return async (dispatch) => {
        const member = await poolService.getById(memberId);
        dispatch({ type: 'SET_MEMBER', member });
    };
}
export function saveMember(member) {
    return async (dispatch) => {
        const isAdd = !member._id;
        const updatedMember = await poolService.saveMember(member);

        if (isAdd) dispatch({ type: 'ADD_MEMBER', member: updatedMember });
        else dispatch({ type: 'UPDATE_MEMBER', updatedMember });
    };
}
export function removeMember(memberId) {
    return async (dispatch) => {
        await poolService.deleteMember(memberId);
        dispatch({ type: 'REMOVE_MEMBER', memberId });
    };
}
