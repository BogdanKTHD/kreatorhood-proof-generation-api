import express from 'express'
import { validateParams } from '../middleware'
import { v1Controller } from '../controllers'

const router = express.Router({
  mergeParams: true
})

router.get(
  '/block-included/:blockNumber',
  validateParams.validateBlockIncludedParams,
  validateParams.validateV1NetworkParam,
  v1Controller.isBlockIncluded
)

router.get(
  '/fast-merkle-proof',
  validateParams.validateFastMerkleProofParams,
  validateParams.validateV1NetworkParam,
  v1Controller.fastMerkleProof
)

router.get(
  '/exit-payload/:burnTxHash',
  validateParams.validateExitPayloadParams,
  validateParams.validateV1NetworkParam,
  v1Controller.exitPayload
)

router.get(
  '/all-exit-payloads/:burnTxHash',
  validateParams.validateExitPayloadParams,
  validateParams.validateV1NetworkParam,
  v1Controller.allExitPayloads
)

export default router
