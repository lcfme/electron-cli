import { join } from 'path'

const pathFromCwd = dir => join(process.cwd(),dir)

export default pathFromCwd
