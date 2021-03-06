import merge from 'webpack-merge'

import base from './base'
import clean from './clean'
import defineNodeENV from './define-node-env'
import eslint from './eslint'
import optimize from './optimize'
import offline from './offline'

const presets = [
  base,
  clean,
  defineNodeENV,
  eslint,
  optimize,
  offline
]

export default (neatoOptions) => (
  presets.reduce((webpackConfig, preset) => (
    merge.smart(webpackConfig, preset.configure(neatoOptions))
  ), {})
)
