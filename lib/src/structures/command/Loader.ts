import fs from 'fs'
import path from 'path'
import type Client from '../../Client'
import isClass from '../../util/isClass'
import isConstructor from '../../util/isConstructor'

export async function CommandLoader (client: Client, _path: string = 'darkcord/commands') {
  const commandsLoaded = []

  const dir = `${path.dirname(<string>require.main?.filename)}${path.sep}${_path}`

  fs.readdir(path.resolve(_path), (err, __) => {
    if (err) throw err
    for (const pof of __) {
      if (fs.lstatSync(path.join(_path, pof)).isDirectory()) {
        fs.readdir(path.join(_path, pof), (err, files) => {
          if (err) throw err

          files = files.filter(file => file.endsWith('.js'))
          for (const file of files) {
            const _dir = path.relative(dir, file)
            let commando = require(_dir)

            if (isClass(commando)) {
              if (commando.default) {
                commando = commando.default
              }

              if (isConstructor(commando)) {
                commando = new commando()
                if (commando.name) {
                  client.commands.set(commando.name, commando)
                } else {
                  throw new Error(`Missing command name.\nFile: ${file}`)
                }
              } else {
                if (commando.name) {
                  client.commands.set(commando.name, commando)
                } else {
                  throw new Error(`Missing command name.\nFile: ${file}`)
                }
              }
            } else {
              throw new Error(`File ${file} is not a class.`)
            }
          }
        })
      } else {
        if (pof.endsWith('.js')) {
          const _dir = path.relative(dir, pof)
          let commando = require(_dir)

          if (isClass(commando)) {
            if (commando.default) {
              commando = commando.default
            }

            if (isConstructor(commando)) {
              commando = new commando()
              if (commando.name) {
                client.commands.set(commando.name, commando)
              } else {
                throw new Error(`Missing command name.\nFile: ${pof}`)
              }
            } else {
              if (commando.name) {
                client.commands.set(commando.name, commando)
              } else {
                throw new Error(`Missing command name.\nFile: ${pof}`)
              }
            }
          } else {
            throw new Error(`File ${pof} is not a class.`)
          }
        }
      }
    }
  })
}
