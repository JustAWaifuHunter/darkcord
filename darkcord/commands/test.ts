import DarkCord from '../../lib'
import CommandContext from '../../lib/src/structures/command/CommandContext'

class CommandTest extends DarkCord.Command {
  constructor () {
    super({
      name: 'test'
    })
  }

  execute (ctx: CommandContext) {
    ctx.send('funcionando')
  }
}

export default CommandTest
