import { v2 as webdav } from 'webdav-server';

// 1. Create a user manager and add a user
const userManager = new webdav.SimpleUserManager()
const user = userManager.addUser('user', 'password', false)

// 2. Create a privilege manager
const privilegeManager = new webdav.SimplePathPrivilegeManager()

// 3. Configure the WebDAV server
const server = new webdav.WebDAVServer({
  // HTTP Digest authentication for better security
  httpAuthentication: new webdav.HTTPDigestAuthentication(userManager, 'default-realm'),
  privilegeManager
})

// 4. Set up a physical file system folder (e.g., `./data`) as the root
const publicFileSystem = new webdav.PhysicalFileSystem('./')

server.setFileSystem('/', publicFileSystem, (success) => {
  if (!success) {
    console.error('Failed to set file system')
    process.exit(1)
  }
  // Give the user all permissions on the root
  privilegeManager.setRights(user, '/', ['all'])
});

export const webdavMiddleware = webdav.extensions.express("/", server)
