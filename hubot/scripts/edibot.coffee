module.exports = (robot) ->

  robot.respond /flag (.*)/i, (msg) ->
    console.log msg.match[1]

    data = JSON.stringify({
      "flag": msg.match[1]
    })

    robot.http('http://10.10.5.62:3060/')
      .header('Content-Type', 'application/json')
      .post(data) (err,res,body) ->
        msg.send "#{body}"
