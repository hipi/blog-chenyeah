export default ({ app }) => {

    if (process.env.NODE_ENV !== "production") return
    
    app.router.afterEach((to, from) => {
        try {
      		window._hmt = window._hmt || []
      		window._hmt.push(['_trackPageview', to.fullPath])
    	} catch (e) {}
    })
}
