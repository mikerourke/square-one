import delay from './delay';

const leads = [
    {
        id: 'steve-leadsman',
        firstName: 'Steve',
        lastName: 'Leadsman'
    },
    {
        id: 'nancy-leadelstein',
        firstName: 'Nancy',
        lastName: 'Leadelstein'
    },
    {
        id: 'paco-leadrojo',
        firstName: 'Paco',
        lastName: 'Leadrojo'
    }
];

const generateId = (lead) => {
    return lead.firstName.toLowerCase() + '-' + lead.lastName.toLowerCase();
};

class LeadApi {
    static getAllLeadsAsync() {
        return leads;
    }

    static getAllLeads() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], leads));
            }, delay);
        });
    }

    static saveLead(lead) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (lead.id) {
                    const existingLeadIndex = leads.findIndex(l => l.id == lead.id);
                    leads.splice(existingLeadIndex, 1, lead);
                } else {
                    lead.id = generateId(lead);
                    leads.push(lead);
                }

                resolve(Object.assign({}, lead));
            }, delay);
        });
    }

    static deleteLead(leadId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const indexOfLeadToDelete = leads.findIndex(lead => {
                    lead.leadId == leadId;
                });
                leads.splice(indexOfLeadToDelete, 1);
                resolve();
            }, delay);
        });
    }
}

export default LeadApi;