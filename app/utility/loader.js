const defaultStatus = {
    initial: false,
    loading: false,
    success: false,
    error: false
};

module.exports = {
    initial: () => ({ ...defaultStatus, initial: true }),
    begin: () => ({ ...defaultStatus, loading: true }),
    success: (data) => ({ ...defaultStatus, success: true, data }),
    error: (error) => ({ ...defaultStatus, error })
};
