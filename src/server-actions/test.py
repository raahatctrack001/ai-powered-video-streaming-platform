# Program to simulate the study of different security protocols

def study_security_protocol(protocol):
    protocols = {
        "WEP": {
            "Description": "Wired Equivalent Privacy (WEP) is an outdated security protocol for wireless networks.",
            "Key Features": [
                "Uses RC4 stream cipher.",
                "Supports static WEP keys (40-bit or 104-bit)."
            ],
            "Strengths": [
                "Simple to configure.",
                "Provides basic data encryption."
            ],
            "Weaknesses": [
                "Vulnerable to IV replay attacks.",
                "Easily cracked within minutes with modern tools."
            ]
        },
        "WPA2": {
            "Description": "Wi-Fi Protected Access 2 (WPA2) is a robust security protocol for wireless networks.",
            "Key Features": [
                "Uses AES encryption with CCMP for better security.",
                "Supports 802.1x authentication and pre-shared keys (PSK)."
            ],
            "Strengths": [
                "Highly secure with AES encryption.",
                "Widely adopted and trusted."
            ],
            "Weaknesses": [
                "Vulnerable to key reinstallation attacks (KRACK)."
            ]
        },
        "PSK": {
            "Description": "Pre-Shared Key (PSK) is a key-based authentication method for wireless networks.",
            "Key Features": [
                "Uses a shared passphrase for authentication.",
                "Can be used with WPA or WPA2 protocols."
            ],
            "Strengths": [
                "Easy to set up for small networks.",
                "Provides encryption without additional hardware."
            ],
            "Weaknesses": [
                "Shared key can be compromised if not kept secure.",
                "Not suitable for enterprise-level networks."
            ]
        },
        "802.1x EAP": {
            "Description": "802.1x EAP is a port-based network access control protocol supporting multiple authentication methods.",
            "Key Features": [
                "Supports methods like EAP-TLS, EAP-PEAP, and EAP-MSCHAPv2.",
                "Designed for enterprise environments."
            ],
            "Strengths": [
                "Provides strong authentication.",
                "Integrates well with existing directory services (e.g., LDAP, RADIUS)."
            ],
            "Weaknesses": [
                "Complex to configure.",
                "Requires dedicated infrastructure (e.g., RADIUS server)."
            ]
        }
    }

    if protocol in protocols:
        data = protocols[protocol]
        print(f"\n### {protocol} Security Protocol ###")
        print(f"Description: {data['Description']}")
        print("\nKey Features:")
        for feature in data['Key Features']:
            print(f"- {feature}")
        print("\nStrengths:")
        for strength in data['Strengths']:
            print(f"- {strength}")
        print("\nWeaknesses:")
        for weakness in data['Weaknesses']:
            print(f"- {weakness}")
    else:
        print("\nInvalid protocol name. Please choose from: WEP, WPA2, PSK, 802.1x EAP.")

# Main program
if __name__ == "__main__":
    print("Study of Security Protocols: WEP, WPA2, PSK, 802.1x EAP")
    protocol = input("Enter the protocol name to study (e.g., WEP, WPA2, PSK, 802.1x EAP): ").strip().upper()
    study_security_protocol(protocol)
