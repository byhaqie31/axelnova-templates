import express, { type Request, type Response } from 'express'
import puppeteer, { type Browser, type PaperFormat } from 'puppeteer'

const app = express()
app.use(express.json({ limit: '2mb' }))

let browser: Browser | null = null

async function getBrowser(): Promise<Browser> {
  if (browser && browser.connected) return browser
  browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  })
  return browser
}

app.get('/health', (_req: Request, res: Response) => {
  res.json({
    ok: !!browser?.connected,
    time: new Date().toISOString(),
  })
})

app.post('/render', async (req: Request, res: Response) => {
  const url = req.body?.url
  const format = (req.body?.format ?? 'A4') as PaperFormat

  if (typeof url !== 'string' || !url) {
    res.status(400).json({ error: 'missing url' })
    return
  }

  let page = null
  try {
    const b = await getBrowser()
    page = await b.newPage()
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 })
    const pdf = await page.pdf({ format, printBackground: true })
    res.setHeader('Content-Type', 'application/pdf')
    res.send(Buffer.from(pdf))
  } catch (err) {
    console.error('render failed', err)
    res.status(500).json({ error: 'render failed', detail: String(err) })
  } finally {
    if (page) await page.close().catch(() => {})
  }
})

const PORT = Number(process.env.PORT ?? 3000)

getBrowser()
  .then(() => {
    app.listen(PORT, () => console.log(`puppeteer ready on :${PORT}`))
  })
  .catch((err) => {
    console.error('puppeteer init failed', err)
    process.exit(1)
  })

const shutdown = async () => {
  if (browser) await browser.close().catch(() => {})
  process.exit(0)
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
