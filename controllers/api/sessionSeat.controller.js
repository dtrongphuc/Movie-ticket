const SESSION_NAME = 'chooseSeat';

const getSession = async () => {
    return JSON.parse(sessionStorage.getItem(SESSION_NAME));
};

const setSession = async (state) => {
    sessionStorage.setItem(SESSION_NAME, JSON.stringify(state));
};
