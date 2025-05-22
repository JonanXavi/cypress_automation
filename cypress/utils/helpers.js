export function assertText(getText, expectedText) {
    getText().then((actualText) => {
        expect(actualText).to.contain(expectedText)
    })
}