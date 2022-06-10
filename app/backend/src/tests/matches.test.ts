import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/matches'
import {matchesMock} from './mocks/matches.mock'
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint /matches', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchesMock as Match[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Testa que o retorno do endpoint /matches está correto', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body.length).to.equal(2)
  });

  // it('Testa que o retorno do endpoint /matches?inProgress=true está correto', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      .post('/matches?inProgress=true')

  //   expect(chaiHttpResponse.status).to.be.equal(200)
  //   expect(chaiHttpResponse.body).to.have.property('id')
  //   expect(chaiHttpResponse.body.id).to.equal(1)
  //   expect(chaiHttpResponse.body).to.have.property('teamName')
  //   expect(chaiHttpResponse.body.id).to.equal('Avaí/Kindermann')
  // });
});
