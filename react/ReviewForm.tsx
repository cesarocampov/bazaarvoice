import { useEffect, useState } from 'react'
import { useRuntime } from 'vtex.render-runtime'

const ReviewForm = ({ appSettings }: { appSettings: Settings }) => {
  const { query, navigate } = useRuntime()
  const [loaded, setLoaded] = useState(false)
  const [productId, setProductId] = useState<string | null>(null)

  useEffect(() => {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.onload = function() {
      setProductId(query.product_id)
      setLoaded(true)
    }

    script.src = `https://display.ugc.bazaarvoice.com/static/${appSettings.clientName}/${appSettings.siteId}/en_US/bvapi.js`

    document.body.appendChild(script)
  }, [
    appSettings.clientName,
    appSettings.siteId,
    query.product_id,
    query.return_page,
  ])

  useEffect(() => {
    if (!window.$BV || !productId) {
      return
    }

    window.$BV.configure('global', {
      events: {
        submissionClose: function() {
          if (query.return_page) {
            navigate({ to: query.return_page })
          }
        },
        submissionSubmitted: function() {
          if (query.return_page) {
            setTimeout(() => navigate({ to: query.return_page }), 1000)
          }
        },
      },
    })

    window.$BV.ui('rr', 'submit_review', {
      productId: productId,
    })
  }, [loaded, navigate, query.return_page, productId])

  return null
}

export default ReviewForm
