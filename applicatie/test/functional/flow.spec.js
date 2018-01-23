const { test, skip } = use('Test/Suite')('Proposals')

skip('---- Login to application ----', async () => { })

skip('---- Add a relation ----', async () => {})
test('add a relation (university utrecht)', async() => {})
test('check if relation exists in view', async() => {})
test('see relation name on view', async() => {})
test('check if insight is zero', async() => {})

skip('---- Add a contact to previously created relation ----', async () => {})
test('add a contact (lennart herlaar)', async () => {})
test('check if contact exists in relation', async () => {})
test('check if insight is still zero', async () => {})

skip('---- Add a proposal to previously created relation ----', async () => {})
test('add a proposal (provide 30 new printers)', async () => {})
test('add another proposal (provide advanced lenses for security cameras)', async () => { })
test('check if insight of both proposals is zero', async () => {})
test('check if insight of relation is still zero', async () => {})

skip('---- Add customer business window information ----', async () => {})
test('add a customer business window information (keep 2 fields empty)', async () => {})
test('check if insight of relation is updated, due to the proposals having better insight from customer business window information', async () => {})
test('edit customer business window information (add 2 remaining empty fields)', async () => {})

skip('---- Add strength and weaknesses to relation ----', async () => { })
test('add a strength and weakness', async () => {})

skip('---- Attach contact to proposal (lennart herlaar -> universiteit utrecht )  ----', async () => { })
test('attach contact to proposal', async () => {})
test('add role ambassador to previously attached contact', async () => {})
test('check if insight has gone up for this proposal', async () => {})

skip('---- Add competitors to proposal ----', async () => { })

skip('---- Add smart actions to proposal ----', async () => { })

skip('---- Add strength and weaknesses to proposal ----', async () => { })

skip('---- Add grow to proposal ----', async () => { })
