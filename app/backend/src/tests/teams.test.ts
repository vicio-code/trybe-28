import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/teams'
import { teamsMock } from './mocks/teams.mocks';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teamsMock as Team[]);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Testa que o retorno do endpoint /teams está correto', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body.length).to.equal(3)
  });

  it('Testa que o retorno do endpoint /teams/:id está correto', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1')

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.have.property('id')
    expect(chaiHttpResponse.body.id).to.equal(1)
    expect(chaiHttpResponse.body).to.have.property('teamName')
    expect(chaiHttpResponse.body.id).to.equal('Avaí/Kindermann')
  });


});
