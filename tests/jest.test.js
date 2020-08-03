const addNums = (num1, num2) => num1 + num2;

test('Test addNums Function', () => {
    expect(addNums(1, 2)).toBe(3);
})