<p align="center">
  <img src="https://github.com/user-attachments/assets/f118a6b5-7f4a-453e-b243-90f5fd157710" width="300" alt="WhatsApp Activity Monitor Logo">
</p>

<p align="center">
  A WhatsApp bot that monitors contact activity, typing indicators, and online status using the Baileys library.
</p>


<div align="center">

  
## ❤️ Sponsors [![](https://opencollective.com/ant-design/tiers/sponsors/badge.svg?label=Sponsors&color=brightgreen)](https://opencollective.com/ant-design/contribute/sponsors-218)

| <a href="https://youmind.com?utm_source=ant-design"><img src="https://mdn.alipayobjects.com/huamei_vmgq1x/afts/img/A*SXcuQYBZ6oQAAAAAQJAAAAgAeh6VAQ/original" width="80" alt="YouMind"></a> | <a href="https://tractian.com?utm_source=ant-design"><img src="https://mdn.alipayobjects.com/huamei_vmgq1x/afts/img/A*Z4-4Q67SG5UAAAAAQLAAAAgAeh6VAQ/original" width="80" alt="TRACTIAN"></a> | <a href="https://lobehub.com?utm_source=ant-design"><img src="https://unpkg.com/@lobehub/icons-static-svg@1.79.0/icons/lobehub-color.svg" width="80" alt="LobeHub"></a> |
| :-: | :-: | :-: |

</div>


## Features

* Real-time typing detection
* Online/offline status monitoring
* RTT-based device state detection (Active/Standby/Offline)
* Activity logging and statistics
* Push notifications via ntfy.sh
* Profile picture and status change tracking

## Prerequisites

* Node.js >= 18.0.0
* WhatsApp account
* ntfy.sh topic (for notifications)

## Installation

```bash
git clone https://github.com/auravinsmoke/nata
npm install
# Setup
npx nata setup  # Asks for phone & ntfy topic
# Start
npx nata start
```

or

```bash
npm install -g @auravinsmoke/nataforwa
# Setup (creates .env with ntfy config)
nata init --phone 1234567890 --topic my_topic
# Start (automatically uses ntfy from .env)
nata start
# Help
nata help
```



## Configuration

1. Create a `.env` file:

```env
NTFY_TOPIC=your_topic_name
```

2. Create a `contact-map.json` file:

```json
{
  "1234567890": {
    "lid": "CONTACT_LID_HERE"
  }
}
```

To get the LID (Link ID):

* Link WhatsApp first by running the bot.
* Check the console logs when messages are received.
* Extract the LID from the contact information.

## Usage

### Local Development

```bash
npm start
```

Scan the QR code with WhatsApp → Settings → Linked Devices.

## How It Works

### Device State Detection

The bot uses RTT (Round Trip Time) probing to detect device states:

* **ACTIVE** (RTT < 900ms): Screen on / Active usage
* **STANDBY** (RTT 900-5000ms): Screen off / Device locked
* **OFFLINE** (RTT > 5000ms): Device offline or unreachable

### Activity Tracking

Tracks:

* Typing events and durations
* Online/offline events
* Message response times
* Profile picture changes
* Status changes
* Daily activity patterns
* RTT patterns by state

### Notifications

Sends real-time notifications via ntfy.sh for:

* Typing started/stopped
* Online/offline state changes
* Device state changes (Active/Standby/Offline)

## Files Generated

* `activity.log` - Activity log with timestamps
* `stats.json` - Statistics and analytics
* `auth/` - WhatsApp authentication session

## Security Notes

* Never commit `.env` files with real credentials.
* Never commit `contact-map.json` with real phone numbers.
* The `auth/` folder contains session data - handle with care.
* Use environment variables for sensitive configuration.

## Customization

Edit `index.js` to:

* Change target contact (update LID and JID variables)
* Adjust RTT thresholds for state detection
* Modify notification messages
* Add custom tracking metrics

## Troubleshooting

**QR Code not appearing:**

* Ensure WhatsApp Web is not already logged in.
* Clear the `auth/` folder and try again.

**Connection issues:**

* Check internet connection.
* Verify WhatsApp account is not banned.
* Try restarting the bot.

**Missing notifications:**

* Verify `NTFY_TOPIC` environment variable.
* Check ntfy.sh subscription.
* Test with:

```bash
curl https://ntfy.sh/your_topic -d "test"
```

## License

MIT

## Disclaimer

This is for educational purposes. Ensure you comply with WhatsApp's Terms of Service and obtain consent before monitoring any contacts.
