# WakeOnLan
Wake-on-LAN est la norme de réseau permettant de réveiller les pc en mode veille

- This plugin is an add-on for the [A.V.A.T.A.R](https://avatar-home-automation.github.io/docs) framework. 

 ## 🎯 Usage
Commandes :
- modifier sur fichier Config par vos vrais ip et adresse mac de vos pc
- allume l'ordinateur 1, allume l'ordinateur 2
- remplacer ordinateur 1 ou 2, par quel nom vous, vous voulez
- au moins activer Carte réseau configurée pour WoL Gestionnaire de périphériques → Carte réseau

- ⚙️ Conditions obligatoires pour que WoL fonctionne
WoL activé dans le BIOS/UEFI  
(souvent “Wake on LAN”, “Power On by PCI-E”, “Resume by LAN”)
Carte réseau configurée pour WoL  
Dans Windows :
Gestionnaire de périphériques → Carte réseau
Onglet Avancé → “Wake on Magic Packet” = Enabled
Onglet Gestion de l’alimentation → “Autoriser ce périphérique à sortir l’ordinateur du mode veille”
Le PC doit être éteint mais alimenté  
→ WoL ne marche pas si la multiprise est coupée.
Le paquet doit arriver sur le bon réseau
Même LAN
Ou routeur configuré pour WoL (port 9 UDP broadcast)

## Multi-room

The WakeOnLan plugin is fully multi-room.

## Multi-language

The WakeOnLan plugin relies solely on the system's available languages.

 <table style="border: none;">
  <tr>
    <td style="border: none;"><img src="WakeOnLan/assets/images/WakeOnLan.png" alt="WakeOnLan Logo" width="120"></td>
    <td style="border: none;">
      <h1 style="margin: 0;color: brown;">WakeOnLan</h1>
      <h3 style="margin: 0;">Wake up the Pc</h3>
    </td>
  </tr>
</table>
