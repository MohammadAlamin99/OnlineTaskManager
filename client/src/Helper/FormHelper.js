class FormHelper {
    IsEmpty(value) {
        return value.length === 0;
    }
}
export const { IsEmpty } = new FormHelper();