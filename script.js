// BUG 1: Infinite recursion in verifyProtocol
function verifyProtocol() {
    return verifyProtocol(); // must be removed/commented
}

document.addEventListener("DOMContentLoaded", () => {
    let btn = document.getElementById("execute-btn");

    // BUG 2: Button click triggers infinite loop
    btn.addEventListener("click", () => {
        verifyProtocol(); // remove this call
    });

    // BUG 3: Security check rejects all codes except 0777
    btn.addEventListener("click", () => {
        let input = document.getElementById("code-input").value;
        if (input === "0777") {
            document.getElementById("bar").value = 100;
            finalizeBootSequence(); // BUG 5: function not defined
        } else {
            alert("Denied");
        }
    });

    // BUG 4: Nested shadowing logic
    {
        let input = "0000";
        if (input === "0777") {
            console.log("This inner block overrides outer logic");
        }
    }
});

// BUG 5: finalizeBootSequence missing
// Must be created manually
// function finalizeBootSequence() {
//     alert("System Boot Successful!");
// }
