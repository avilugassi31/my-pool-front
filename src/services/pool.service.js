import { httpService } from './http.service';

const POOL_URl = 'pool/';
export const poolService = {
    getMembers,
    getById,
    deleteMember,
    saveMember,
    getEmptyMember,
};

async function getMembers(filterBy = null) {
    const members = await httpService.get(POOL_URl, filterBy);
    var membersToReturn = members;
    if (filterBy) {
        membersToReturn = filter(filterBy);
    }
    return membersToReturn;
}

function getById(id) {
    return httpService.get(POOL_URl + id);
}

function deleteMember(id) {
    return httpService.delete(POOL_URl + id);
}

function saveMember(member) {
    if (member._id) {
        return httpService.put(POOL_URl + member._id, member);
    } else {
        return httpService.post(POOL_URl, member);
    }
}
function getEmptyMember() {
    return {
        name: '',
        city: '',
        members: 0,
        type: '',
        createdAt: Date.now(),
        finishedAt: Date.now(),
        email: '',
    };
}
async function filter({ term }) {
    term = term.toLocaleLowerCase();
    const members = await httpService.get(POOL_URl);
    return members.filter((member) => {
        return (
            member.name.toLocaleLowerCase().includes(term) ||
            member.type.toLocaleLowerCase().includes(term) ||
            member.city.toLocaleLowerCase().includes(term)
        );
    });
}
