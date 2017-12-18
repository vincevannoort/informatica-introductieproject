'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

/*
|--------------------------------------------------------------------------
| Factories
|--------------------------------------------------------------------------
*/
use('./factories/UserFactory')
use('./factories/ContactFactory')
use('./factories/RelationFactory')
use('./factories/ProposalFactory')
