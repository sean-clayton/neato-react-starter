import merge from 'webpack-merge'

import archetypes from './archetypes'
import presets from './presets'
import loaders from './loaders'
import splitArchetypes from './split-archetypes'

/** @module neato/webpack */

/** A neato object with all Webpack configurations
 * @param {object} neatoOptions - All options given to neato
 */
export default (neatoOptions = {}) => {
  return {
    ...neatoOptions,
    webpack: splitArchetypes(neatoOptions).map(
      (neatoOptionsByArchetype) => merge.smart(
        archetypes(neatoOptionsByArchetype),
        presets(neatoOptionsByArchetype),
        loaders(neatoOptionsByArchetype),
        neatoOptions.webpack || {}
      )
    )
  }
}
