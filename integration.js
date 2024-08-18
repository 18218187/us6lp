
(async function ({ integrationHost, integrationQuery }) {
  const chints = ["platform", "platformVersion", "architecture", "model", "uaFullVersion"];
  const userAgentData = (
    navigator &&
    navigator.userAgentData &&
    typeof navigator.userAgentData.getHighEntropyValues === "function"
  )
    ? await navigator.userAgentData.getHighEntropyValues(chints)
    : {};

  const userAgentDataStr = JSON.stringify(userAgentData);
  const uaDataValues = `uaDataValues=${userAgentDataStr}`;

  this.attachScript = function (url) {
    const d = window.document;
    const head = d.getElementsByTagName('head')[0];
    const script = d.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = 1;
    script.defer = true;
    head.appendChild(script);
  };

  this.getMainScriptUrl = function () {
    const doc_location = window.location.toString();
    const ippContent = localStorage.getItem("ippContent");
    const wpContent = localStorage.getItem("wpContent");
    const pwaContent = localStorage.getItem("pwaContent");
    const isIpadSign = this.checkIsIpad() ? { isIpadSign: true } : {};

    const searchParams = new URLSearchParams({ ...integrationQuery, ippContent, wpContent, pwaContent, doc_location, ...isIpadSign });
    for (const [key, value] of [...searchParams]) {
      if (!value) {
        searchParams.delete(key);
      }
    }

    return `${integrationHost}/ufis/main.js?${searchParams.toString()}&${uaDataValues}`;
  };

  this.checkIsIpad = function () {
    return !!(
      navigator.maxTouchPoints
      && navigator.maxTouchPoints > 2 
      && /MacIntel/.test(navigator.platform)
    );
  }

  const url = this.getMainScriptUrl();
  this.attachScript(url);
})({"integrationHost":"https://seekmymatch.com","integrationQuery":{"tds_oid":"25842","amp;s1":"ps","amp;id":"25842","amp;clickid":"dptdr66428a2400059283","amp;_tgUrl":"aHR0cHM6Ly9zZWVrbXltYXRjaC5jb20vdGRzL2FlL3RnL3MvNWFkNDRhZWJkNGM3YzliY2MzOTJmNGU1NTg5Nzg1MDk/X190PTE3MTU2MzY3NzUwNDEmX19sPTM2MDAmX19jPWFlNDFjZDA5YjY3YzQzMDkxN2MxMTM1Nzc3NWJiY2ZiY2VhY2Q2Mjc=","amp;tds_cid":"ae41cd09b67c430917c11357775bbcfbceacd627","amp;dci":"13c858ca329a4b47f0d40217ce59e64c48121a51","amp;tds_ac_id":"s8304dem","amp;subid2":"1009816971","amp;affid":"43882472","amp;subid":"","amp;tds_campaign":"b7838dem","amp;tds_host":"seekmymatch.com","amp;tds_ao":"1","amp;tds_id":"b7838dem_jump_a_1566561777206","amp;utm_source":"int"}});
