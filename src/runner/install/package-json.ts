import path from 'path'
import json from '../../util/json'

const neatoScripts = {
  'neato:build': 'neato build',
  'neato:develop': 'neato develop --port 3000',
  'neato:dist': 'cross-env NODE_ENV=production neato build --optimize',
  'neato:start': 'npm run develop',
  'neato:lint': 'neato lint',
  'neato:test': 'npm run neato:lint && npm run neato:test:typecheck && npm run neato:test:unit',
  'neato:test:coverage': 'npm run neato:test:unit -- --coverage',
  'neato:test:typecheck': 'neato typecheck',
  'neato:test:unit': 'cross-env NODE_ENV=test neato test',
  'neato:test:unit:watch': 'npm run neato:test:unit -- --watch'
}

export default function (projectPath) {
  const packagePath = path.join(projectPath, 'package.json')
  const packageJSON = json.read(packagePath)

  json.write(packagePath, {
    ...packageJSON,
    scripts: {
      ...neatoScripts,
      ...withoutDefaults(packageJSON.scripts)
    }
  })
}

/**
 * Remove default configurations generated by NPM that can be overwriten
 * We don't want to overwrite any user configured scripts
 */
function withoutDefaults (scripts = {}) {
  const defaultScripts = {
    'test': 'echo "Error: no test specified" && exit 1'
  }

  return Object.keys(scripts)
    .filter((key) => !scripts[key] !== '' && scripts[key] !== defaultScripts[key])
    .reduce((filtered, key) => {
      return {
        ...filtered,
        [key]: scripts[key]
      }
    }, {})
}
