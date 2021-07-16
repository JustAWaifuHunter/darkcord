import fs from 'fs'
import path from 'path'
import { cpuUsage } from 'process'
import type Client from '../../Client'
import isClass from '../../util/isClass'
import isConstructor from '../../util/isConstructor'

export async function CommandLoader (client: Client, _path: string = './darkcord/commands') {
  const commandsLoaded = []

  const dir = path.join(path.dirname(<string>require.main?.filename), _path)

  fs.readdir(path.resolve(dir), (err, __) => {
    if (err) throw err
    for (const pof of __) {
      if (fs.lstatSync(path.join(dir, pof)).isDirectory()) {
        fs.readdir(path.join(_path, pof), (err, files) => {
          if (err) throw err

          files = files.filter(file => file.endsWith('.js'))
          for (const file of files) {
            const _dir = path.relative(
              path.join(dir, file),
              path.join(_path, file)
            )
            let commando = require(_dir)

            if (commando.default) {
              commando = commando.default
            }

            if (isClass(commando)) {
              if (isConstructor(commando)) {
                commando = new commando()

                const name = commando.options?.name ?? commando.name

                if (name) {
                  commandsLoaded.push(name)
                  client.commands.set(name, commando)
                } else {
                  throw new Error(`Missing command name.\nFile: ${file}`)
                }
              } else {
                const name = commando.options?.name ?? commando.name

                if (name) {
                  commandsLoaded.push(name)
                  client.commands.set(name, commando)
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
          const _dir = path.relative(
            path.join(dir, pof),
            path.join(_path, pof)
          )

          let commando = require(_dir)

          if (commando.default) {
            commando = commando.default
          }

          if (isClass(commando)) {
            if (isConstructor(commando)) {
              commando = new commando()

              const name = commando.options?.name ?? commando.name

              if (name) {
                commandsLoaded.push(name)
                client.commands.set(name, commando)
              } else {
                throw new Error(`Missing command name.\nFile: ${pof}`)
              }
            } else {
              const name = commando.options?.name ?? commando.name

              if (name) {
                commandsLoaded.push(name)
                client.commands.set(name, commando)
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
