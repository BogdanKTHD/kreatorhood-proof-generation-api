/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const baseUrl = 'localhost:3000'

chai.use(chaiHttp)
describe('Proof Generation API Tests', () => {
  // test to check if endpoint it live
  it('server is live', function(done) {
    chai.request(baseUrl)
      .get('/health-check')
      .end(function(err, res) {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        done()
      })
  })

  //
  // test to check block inclusion endpoint
  //
  it('block inclusion test', (done) => {
    chai.request(baseUrl)
      .get('/api/v1/matic/block-included/1234')
      .end(function(err, res) {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        expect(res.body.message).to.equal('success')
        done()
      })
  })

  it('block non inclusion test', (done) => {
    chai.request(baseUrl)
      .get('/api/v1/matic/block-included/999999999999999')
      .end(function(err, res) {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(404)
        expect(res.body.error).to.be.true
        done()
      })
  })

  it('invalid block number test', (done) => {
    chai.request(baseUrl)
      .get('/api/v1/matic/block-included/12324.56')
      .end(function(err, res) {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(400)
        expect(res.body.error).to.be.true
        done()
      })
  })

  //
  // tests to check merkle proof generation
  //
  it('merkle proof generation test', (done) => {
    chai.request(baseUrl)
      .get('/api/v1/matic/fast-merkle-proof?start=12345&end=12347&number=12346')
      .end(function(err, res) {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        expect(res.body.proof).to.equal('0xc62218dfcdc47711e777e6036806592cac1e079f55e2f8f30e6b165bf8737d163643be7c8414f4fc0cfebecce5ba6c663dfbcd74359e3847a429c268777342bb')
        done()
      })
  })

  it('invalid merkle proof generation arguments test - 1', (done) => {
    chai.request(baseUrl)
      .get('/api/v1/matic/fast-merkle-proof?start=12345.54&end=12347&number=12346')
      .end(function(err, res) {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(400)
        expect(res.body.error).to.be.true
        done()
      })
  })

  it('invalid merkle proof generation arguments test - 2', (done) => {
    chai.request(baseUrl)
      .get('/api/v1/matic/fast-merkle-proof?start=12345&end=12347&number=12348')
      .end(function(err, res) {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(400)
        expect(res.body.error).to.be.true
        done()
      })
  })

  it('invalid merkle proof generation arguments test - 3', (done) => {
    chai.request(baseUrl)
      .get('/api/v1/matic/fast-merkle-proof?start=12348&end=12347&number=12347')
      .end(function(err, res) {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(400)
        expect(res.body.error).to.be.true
        done()
      })
  })

  //
  // tests to check exit payload endpoint
  //
  it('exit payload test', (done) => {
    chai.request(baseUrl)
      .get('/api/v1/matic/exit-payload/0x1a7b6aba7e51344474d4fe722a3969e8c7a863c72329210a0dda80d26c4234b4?eventSignature=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef')
      .end(function(err, res) {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        expect(res.body.result).to.equal('0xf90aa6840ab89930b901202a33308a41c815aba55f5691ca914c4acf9e3aa63e02d923b6363704144053446ade3b600bac42cde36bdb4bd2249cb82a93bfb0b81e8f39e99d24cc2cc8379bfe870e7bf2a1baadc80c5454a9f8657660f7c7907af161eb386516f65ac063895ce49f6aba16803d2155f791be0087a2baa6b172246e4cf5b464e79fe7a42afb765c23cd90b852d47b5f0de3c4eeb8eb201d51c4477fdf196d525ac69e840a6c865c064b9c9a94cdd74fd4ebf93487b96cf5ea1592bd1572a37c8d598ea1f58de18f381b1b76949256d28ba69e7b56b4f3efa794ef82e1adb93abde35782c26a3ffcfff7ba1ede82737010a5b62c7ede8b5686bfdbe2c64ae753c1c677f22bf6249d14db2a73f49eb099096d5cd1e5ba0bea27e2f043586aab0d7c348391d10884011466d684611cc91fa01e539f56653600b2b7ff93ecaa250a1dd883dd1ebdbb4aa76edb618906a792d3a0eb53e79fed1d97928f60afe8f9252e0016cfddb748d3e17d911e484d995e687eb902ebf902e801838a62bbb9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000208000000000000000000000000000000000000000000010000008000000800000000000000000000100000000000000000000020000000080000000000800000000000000000080000010004000000000000000000000000000000000000000010000000000000000000000000000200000000000000000000000000000800000000000000000000000000000004000800002000000000001000000000000000000000000000000100000000020000000000000000000000000000000000080000000000000000000000000100000f901ddf89b947ceb23fd6bc0add59e62ac25578270cff1b9f619f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa000000000000000000000000030567d4a92c63ac67191c4ea4b51f7f0cfcfcfd7a00000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000038d7ea4c68000f9013d940000000000000000000000000000000000001010f884a04dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63a00000000000000000000000000000000000000000000000000000000000001010a000000000000000000000000030567d4a92c63ac67191c4ea4b51f7f0cfcfcfd7a000000000000000000000000041d5b3e2ec53583bc0601dfb4f2a11a392049489b8a000000000000000000000000000000000000000000000000000001f6dba73130000000000000000000000000000000000000000000000000000009b72f2ab0fd000000000000000000000000000000000000000000000056072c7d83e450e534600000000000000000000000000000000000000000000000000007c053837fcd000000000000000000000000000000000000000000000056072c7f7abff816646b9063df9063af90131a0ceb8bfa3d6e923dff442b84f601ab69bedcb298ff512eae41e6546b0d8b670f7a0ae06bd03d2d752c3b3d9367882cdf14c50031de47be851e3ed482ca76ddde125a04eb124ddb05e4bef853dd667515b229ac5e61ae7b08278fbcf1e3b41e4a94e7ba03a3f75822157e1cd09daa5260a6ead65283d8f12eb8e94a2af90106464dac3dda0cbffb240aed9bac65f760950661abd9fa2a35e4009e002c4b9040d81e0cb0f82a00c85087cb0795e9e34680466df9ccfb4b655caba482eaf614e53ed66a31520e7a07fd13d8cbede5c861b25d64d758debb4bd5d2fd91325fe80b9cb69c65ec5937aa01441088a66987e5202d679c232f9ed3a17f8e5aba002dec86b519d423c579ab5a0aa70f5cb98a659b98a4e7874da813da6e400a92c9742d8d418d5a666f264a0458080808080808080f90211a0a3b95467113e68e2fa893d468a455fb6ab242b6322c955077b99c783e2b4f8d6a0f21be632a084cb29e5236eded28b37b7533799a94245fae2717d21e99171e408a06525210459358f82e1426a1ec1dc1326a3a2bcfd4ae71bc1eea58210759baebba08fe2e6dfeb8a49328a9280806836b2fd8cd9f8dbdcdc5682736abbf94a4a4a37a051a85782604664d895c0ad9a6f4c2d119499213722eb3cc6e77c39e4d7568b08a08b036b5f5e6fd68c56814b5f17fed6c68f8c2584d930f1f6853dd8a773e69b29a00eb164f6de8cd7c9dfc2180b67119638b57ae5d7e868937dd58beb3bfcf4ccb2a029098a2c454b68bfdb644084073a33efa4a1dd41d5b65dc2c15f57b800bd8e00a0e2d16ac05b109bd8a4e55668908496156c48d91ed6661a9815b6985221776d0da0dde9d87ecc891728fd292087c15fccb2e7dd02f47b766ad37ddfdbe6c1cc67d1a0d5682d4e3a605d46179dda91723d8deae61e4a085ffa8edd96e1abe574c29149a0756d273cdad201b7362088c79e21259496e4275a1ff90170a1a23d00026f35dda075a5712e3a7f6caf51a3e6cddf92f67efc7937f66f46582f45f699b3ff553a85a0f2cc232d46f7d97429cb78957c9ad1f6c6f848f6007d868b6f36af7fc04f0385a0eaabccc83dc562b4857492d1312e407234a0844a663639d76c3831788b71dfeea0e5c47cab05dbe61b74ffedcc081f96200fdbdded5b92c852c0fc2a841a5bb2f080f902ef20b902ebf902e801838a62bbb9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000208000000000000000000000000000000000000000000010000008000000800000000000000000000100000000000000000000020000000080000000000800000000000000000080000010004000000000000000000000000000000000000000010000000000000000000000000000200000000000000000000000000000800000000000000000000000000000004000800002000000000001000000000000000000000000000000100000000020000000000000000000000000000000000080000000000000000000000000100000f901ddf89b947ceb23fd6bc0add59e62ac25578270cff1b9f619f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa000000000000000000000000030567d4a92c63ac67191c4ea4b51f7f0cfcfcfd7a00000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000038d7ea4c68000f9013d940000000000000000000000000000000000001010f884a04dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63a00000000000000000000000000000000000000000000000000000000000001010a000000000000000000000000030567d4a92c63ac67191c4ea4b51f7f0cfcfcfd7a000000000000000000000000041d5b3e2ec53583bc0601dfb4f2a11a392049489b8a000000000000000000000000000000000000000000000000000001f6dba73130000000000000000000000000000000000000000000000000000009b72f2ab0fd000000000000000000000000000000000000000000000056072c7d83e450e534600000000000000000000000000000000000000000000000000007c053837fcd000000000000000000000000000000000000000000000056072c7f7abff81664682002a80')
        done()
      })
  })

  it('invalid exit payload arguments test - 1', (done) => {
    chai.request(baseUrl)
      .get('/api/v1/matic/exit-payload/272ce652e562677a0db65f95d0c0dc1dd11ef6b2099f09acdaf9b831b51f6804?eventSignature=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef')
      .end(function(err, res) {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(400)
        expect(res.body.error).to.be.true
        done()
      })
  })

  it('invalid exit payload arguments test - 2', (done) => {
    chai.request(baseUrl)
      .get('/api/v1/matic/exit-payload/0x272ce652e562?eventSignature=0xdf252ad1be2c89b69c2b068fc378daa95')
      .end(function(err, res) {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(400)
        expect(res.body.error).to.be.true
        done()
      })
  })

  it('erc1155 exit payload arguments test - 2', (done) => {
    chai.request(baseUrl)
      .get('/api/v1/matic/exit-payload/0x4d4a9ee49a681a97ade92788f2fdce1d1761978ab491c2a10eb6849101cd63fe?eventSignature=0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb')
      .end(function(err, res) {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        // expect(res.body.result).to.be.true
        done()
      })
  })
})
