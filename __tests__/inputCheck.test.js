const inputCheck = require('../utils/inputCheck');

test('inputCheck() returns null when all properties exist', () => {
    const obj = {first_name: 'alice'};
    
    expect(inputCheck(obj, 'name')).toBe(null);
});

test('inputCheck() returns an object when a property is missing', () => {
    const obj = {first_name: 'alice', role_id: ''};
    expect(inputCheck(obj, 'first_name', 'role_id')).toEqual(
        expect.objectContaining({
            error: expect.stringContaining('No role specified')
        })
    );
});
