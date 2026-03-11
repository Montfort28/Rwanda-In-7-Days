<div id="inquiryModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;align-items:center;justify-content:center;">
    <div style="background:#fff;border-radius:22px;padding:32px;max-width:500px;width:90%;">
        <h2>Inquiry Form</h2>
        <form>
            <input type="email" placeholder="Your email" required style="width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:8px;">
            <textarea placeholder="Your message" required style="width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:8px;min-height:120px;"></textarea>
            <button type="submit" class="fyt-btn fyt-btn-primary" style="width:100%;">Send Inquiry</button>
        </form>
        <button onclick="document.getElementById('inquiryModal').style.display='none'" style="margin-top:10px;width:100%;padding:10px;border:1px solid #ddd;background:#fff;border-radius:8px;cursor:pointer;">Close</button>
    </div>
</div>
