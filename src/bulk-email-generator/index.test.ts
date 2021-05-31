import { stripIndent } from 'common-tags'
import bulkMailGenerator from "./index"
import { MockConsoleLog } from "../utils/index"

describe("Bulk email generator", () => {
    beforeEach(() => {
        MockConsoleLog.clearLogs();
    });

    afterAll(() => {
        MockConsoleLog.cleanUp();
    });

    test("exemple", () => {
        const input = stripIndent`
            3
            This is the (first|second|third) choice.
            This is the (first|second|third) choice.
            This is the (first|second|third) choice.`;
        const expectedOutput = stripIndent`
            This is the first choice.
            This is the second choice.
            This is the third choice.`;
        MockConsoleLog.test(bulkMailGenerator, input, expectedOutput);
    });

    test("CG email", () => {
        const input = stripIndent`
            7
            (Hello|Hi|Bonjour|Salut|Hey) (les amis|coders|bande de @$%*),
            
            I keep getting an error( 492|) in the notification area.
            Are you aware of that?
            
            (Bye|Ciao|Fsck off|Best regards),
            Your Name Here`;
        const expectedOutput = stripIndent`
            Hello coders,

            I keep getting an error 492 in the notification area.
            Are you aware of that?
            
            Best regards,
            Your Name Here`;
        MockConsoleLog.test(bulkMailGenerator, input, expectedOutput);
    });

    test("Edge cases", () => {
        const input = stripIndent`
            7
            (No choice)
            (Empty choice|)
            Lotsa (1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59|60|61|62|63|64|65|66|67|68|69|70|71|72|73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98|99|100) choices
            Does it (wrap|unwrap)?
            (Multi
            line|Multi
            line)`;
        const expectedOutput = stripIndent`
            No choice

            Lotsa 3 choices
            Does it unwrap?
            Multi
            line`;
        MockConsoleLog.test(bulkMailGenerator, input, expectedOutput);
    });

    test("Comment Spam", () => {
        const input = stripIndent`
            1
            (You must|You need to|You have to|You should) (take advantage of|make the most of|benefit from|take full advantage of) (all the|all of the|each of the|every one of the) software advancements that (happen to be|are actually|are|are generally) (a successful|an effective|an excellent|a prosperous) (Internet marketer|Online marketer|Internet entrepreneur|Affiliate marketer). (If your|In case your|Should your|When your) work (begins to|starts to|actually starts to) suffer, (the competition|your competition|competition|your competitors) could (leave you|make you|create) (in the|within the|inside the|from the) dust. Show (that you are|that you will be|that you are currently|you are) always (on the|around the|in the|about the) (cutting edge|innovative|leading edge|really advanced), (and they will|and they can) (learn to|learn how to|figure out how to|discover how to) trust (you and your|both you and your|you and the|your) products.`;
        const expectedOutput = stripIndent`
            You must make the most of each of the software advancements that are generally a successful Online marketer. Should your work starts to suffer, the competition could leave you inside the dust. Show you are always on the innovative, and they will discover how to trust you and your products.`;
        MockConsoleLog.test(bulkMailGenerator, input, expectedOutput);
    });

    test("More Edge Cases", () => {
        const input = stripIndent`
            7
            (|Empty choice)
            (No choice)
            Lotsa (1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59|60|61|62|63|64|65|66|67|68|69|70|71|72|73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98|99|100) choices
            Does it (curve|blend)?
            (Lines
            by two|Two
            lines)`;
        const expectedOutput = "\n" + stripIndent`            
            No choice
            Lotsa 3 choices
            Does it blend?
            Lines
            by two`;
        MockConsoleLog.test(bulkMailGenerator, input, expectedOutput);
    });
})