const throwError = (status: number, message: string) => {
    throw {
        status,
        errorMessage: message
    }
}

export default throwError;