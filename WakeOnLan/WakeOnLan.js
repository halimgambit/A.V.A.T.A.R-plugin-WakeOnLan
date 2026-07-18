import wol from "wake_on_lan";
import ping from "ping";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function init () {
    await Avatar.lang.addPluginPak('WakeOnLan');
}

export async function action(data, callback) {
    try {
        const Locale = await Avatar.lang.getPak('WakeOnLan', data.language);
        const tblActions = {
            wakePc: () => wakePc(data, data.client, Locale)
        };

        info("WakeOnLan:", data.action.command, "from", data.client);

        if (tblActions[data.action.command]) {
            await tblActions[data.action.command]();
        }

    } catch (err) {
        if (data.client) Avatar.Speech.end(data.client);
        if (err.message) error(err.message);
    } finally {
        callback();
    }
}

const wakePc = async (data, client, Locale) => {
    const sentence = (data.rawSentence || data.action.sentence || "").toLowerCase();
    const PC_LIST = Config.modules.WakeOnLan.PC_LIST;
    const DEFAULT_BROADCAST = Config.modules.WakeOnLan.DEFAULT_BROADCAST;

    const foundPcName = Object.keys(PC_LIST).find(name => 
        sentence.includes(name.toLowerCase())
    );

    if (!foundPcName) {
        infoOrange(Locale.get('speech.unknowPc'));
        return new Promise((resolve) => {
            Avatar.speak(Locale.get('speech.unknowPc'), client, () => {
                Avatar.Speech.end(client);
                resolve();
            });
        });
    }

    const pc = PC_LIST[foundPcName];

    const initialPing = await ping.promise.probe(pc.ip);
    if (initialPing.alive) {
        infoGreen(Locale.get(["speech.alreadyPc", foundPcName]));
        return new Promise((resolve) => {
            Avatar.speak(Locale.get(["speech.alreadyPc", foundPcName]), client, () => {
                Avatar.Speech.end(client);
                resolve();
            });
        });
    }

    await new Promise((resolve, reject) => {
        wol.wake(pc.mac, { address: DEFAULT_BROADCAST }, (err) => {
            if (err) return reject(new Error(Locale.get(["error.errorSend", err])));
            resolve();
        });
    });

    infoOrange(`Paquet envoyé à ${foundPcName}. Attente de démarrage du système (15s)...`);
    Avatar.speak(Locale.get(["speech.existPc", foundPcName]), client);
    await delay(15000); 
    const verificationPing = await ping.promise.probe(pc.ip);
    if (!verificationPing.alive) {
        infoOrange(`Échec de la validation pour ${foundPcName} (${pc.ip}).`);
        const errorMsg = Locale.get(["speech.returnExistPc", foundPcName]);
        await new Promise((resolve) => {
            Avatar.speak(errorMsg, client, () => {
                Avatar.Speech.end(client);
                resolve();
            });
        });
        throw new Error(errorMsg);
    }

    info(Locale.get(["speech.turnPc", foundPcName]));
    return new Promise((resolve) => {
        Avatar.speak(Locale.get(["speech.turnPc", foundPcName]), client, () => {
            Avatar.Speech.end(client);
            resolve();
        });
    });
};

