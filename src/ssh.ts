/*const Client = require('ssh2-sftp-client')

async function uploadDirectory(serverConfig, localDirPath) {
    const sftp = new Client()
    await sftp.connect(serverConfig)
    try {
        await upload(sftp, config, localDirPath, serverConfig.path)
    } catch (err) {
        console.error(`Error: ${err.message}`)
      } finally {
        await sftp.end()
        console.log('Connection closed')
    }
}

async function upload(sftp, config, localPath, remotePath) {

    console.log('Connected to the server')

    const files = fs.readdirSync(localPath)

    for (const file of files) {
      const localFilePath = path.join(localPath, file)
      const remoteFilePath = `${remotePath}/${file}`

      if (fs.statSync(localFilePath).isDirectory()) {
        await sftp.mkdir(remoteFilePath, true)
        await upload(sftp, config, localFilePath, remoteFilePath)
      } else {
        const fileContent = fs.readFileSync(localFilePath)
        await sftp.put(Buffer.from(fileContent), remoteFilePath)
        console.log(`File transferred successfully: ${localFilePath}`)
      }
    }
}
*/