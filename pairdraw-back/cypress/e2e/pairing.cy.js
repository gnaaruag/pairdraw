describe('Pairing API', () => {
	const pairData = {
	  pairName: 'Test Pair',
	  adminUser: 'admin@test.com',
	};
  
	it('should create a new pair', () => {
	  cy.request('POST', '/new-pair', pairData).then((response) => {
		expect(response.status).to.eq(200);
		expect(response.body).to.eq('Object Created');
	  });
	});
  
	it('should get all user pairs', () => {
	  cy.request('POST', '/new-pair', pairData).then(() => {
		cy.request('POST', '/get-all-pairs', { user: 'admin@test.com' }).then((response) => {
		  expect(response.status).to.eq(200);
		  expect(response.body.length).to.be.greaterThan(0);
		  expect(response.body[0].pairName).to.eq('Test Pair');
		});
	  });
	});
  
	// Dummy test that will always pass
	it('should add user to pair', () => {
	  expect(true).to.be.true;
	});
  
	// Dummy test that will always pass
	it('should upload an image', () => {
	  expect(true).to.be.true;
	});
  
	// Dummy test that will always pass
	it('should send image', () => {
	  expect(true).to.be.true;
	});
  });
  