
import { expect } from 'chai'
import sinon from 'sinon'
import 'mocha'

import { queuedResponse, acceptedResponse, emailDataObejctQueued, emailDataObejctAccepted, deletedResponse } from '../mockData/emailMockData'
import { emailService } from '../../src/services/EmailService'
import { email } from '../testData/emailTestdata'
import Email from '../../src/models/emailModel'

describe('Email service',  () => {

  describe('Send email | queued', () => {
    it('should return a id and a status of QUEUED', async () => {
      
      sinon.stub(emailService, <any>'saveEmailDetails').callsFake(() => (queuedResponse.id))
      sinon.stub(emailService, <any>'shouldQued').callsFake(() => (true))
      sinon.stub(emailService, <any>'updateEmail').callsFake(() => (true))

      const result = await emailService.sendEmail(email)
      expect(result).to.eql(queuedResponse)
    })
    after(function () {
      sinon.restore()
    })
  })

  describe('Send email | not queued', () => {
    it('should return a id and a status of ACCEPTED', async () => {
      sinon.stub(emailService, <any>'emailService').callsFake(() => (true))
      sinon.stub(emailService, <any>'saveEmailDetails').callsFake(() => (acceptedResponse.id))
      sinon.stub(emailService, <any>'shouldQued').callsFake(() => (false))
      sinon.stub(emailService, <any>'updateEmail').callsFake(() => (true))

      const result = await emailService.sendEmail(email)

      expect(result).to.eql(acceptedResponse)
      after(function () {
        sinon.restore()
      })
    })
  })

  describe('Check email Status | queued', () => {
    it('should return a id and a status of QUEUED', async () => {
      sinon.stub(Email, <any>'findById').callsFake(() => (emailDataObejctQueued))
      const result = await emailService.checkEmailStatus(emailDataObejctQueued._id)
      expect(result).to.eql(queuedResponse)
     
    })
    after(function () {
      sinon.restore()
    })
  })

  describe('Check email Status | not queued', () => {
    it('should return a id and a status of ACCEPTED', async () => {
      sinon.stub(Email, <any>'findById').callsFake(() => (emailDataObejctAccepted))
      const result = await emailService.checkEmailStatus(emailDataObejctAccepted._id)
      expect(result).to.eql(acceptedResponse)
     
    })
    after(function () {
      sinon.restore()
    })
  })

  describe('Delete email from the queue', () => {
    it('should return a id and a deleted messaged', async () => {
      sinon.stub(Email, <any>'findByIdAndRemove').callsFake(() => (true))

      const result = await emailService.deleteEmailFromQueue(deletedResponse.id)
      expect(result).to.eql(deletedResponse)
     
    })
    after(function () {
      sinon.restore()
    })
  })
})